import {RefreshIcon} from "@heroicons/react/solid";

export const Loading = () => {
    return (<div className={"grid place-content-center"}>
            <RefreshIcon  className={"text-blue-700 animate-spin w-16"}/>
            <span>Fetching data...</span>
    </div>)
}