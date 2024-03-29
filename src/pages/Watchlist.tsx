import { getList } from "../utils/watchListLocalStorage"
import Grid from "../components/Grid";

export default function Watchlist(){
    const watchList = getList();
    return !watchList || watchList.length === 0 ? (
        <div className="h-[50vh] grid place-content-center bg-textColor/5 text-3xl text-primary font-semibold">Nothing to see here</div>
    ) : (

        <div className="my-6">
            <div className="flex items-center justify-center">
            <h3 className="border-b-2 border-b-primary text-xl font-semibold">Watchlist</h3>
            </div>
             <Grid animes={watchList}/>
        </div>

    )

}
