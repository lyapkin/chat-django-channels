import re
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin
from django.core.validators import RegexValidator
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.forms import ValidationError
from django.contrib.auth.password_validation import validate_password



class CustomUserManager(UserManager):
    def get_by_natural_key(self, username):
        case_insensetive_username_field = '{}__iexact'.format(self.model.USERNAME_FIELD)
        return self.get(**{case_insensetive_username_field: username})


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username_validator = RegexValidator(
        regex=r'^[a-zA-Z0-9](_(?![_.])|\.(?![_.])|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$',
        message=_(
            "Enter a valid username. This value may contain only English letters, "
            "numbers, and _/. character; only a letter or digit character at the begining and at the end."
        ),
        flags=re.ASCII
    )

    username = models.CharField(
        _("username"),
        max_length=20,
        unique=True,
        help_text=_("Required. 20 characters or fewer. Letters, digits and ./_ only."),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    first_name = models.CharField(_("first name"), max_length=20, blank=True)
    last_name = models.CharField(_("last name"), max_length=20, blank=True)
    email = models.EmailField(
        _("email address"),
        unique=True,
        error_messages={
            "unique": _("A user with that email address already exists."),
        },
    )
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    objects = CustomUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def clean_fields(self, exclude=None):
        errors = {}
        try:
            super().clean_fields(exclude)
        except ValidationError as err:
            errors = err.update_error_dict(errors)
    
        try:
            validate_password(self.password)
        except ValidationError as err:
            errors['password'] = err

        if errors:
            raise ValidationError(errors)
    
    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)
        self.username = self.username.lower()

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)
