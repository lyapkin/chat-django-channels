import { useContext } from "react";
import { LastClickedConnectionContext } from "../context/LastClickedConnectionContext";

export const useLastCkickedConnection = () => {
    return useContext(LastClickedConnectionContext)
}