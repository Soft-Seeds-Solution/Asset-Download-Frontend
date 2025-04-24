import Categories from "./Categories";
import Hero from "./Hero";
import RecentlyAdded from "./RecentlyAdded";
import TopViews from "./TopViews";
import TrendingNow from "./TrendingNow";

export default function HomePage() {

    return (
        <>
            <Hero />
            <Categories/>
            <RecentlyAdded />
            <TrendingNow />
            <TopViews />
        </>
    )
}
