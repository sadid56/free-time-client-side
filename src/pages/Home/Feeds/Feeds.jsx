import { useEffect, useState } from "react";
import Feed from "../../../shared/Feed/Feed";

const Feeds = () => {
    const [news, setNews] = useState([])

    useEffect(()=>{
        fetch('/feeds.json')
        .then(res => res.json())
        .then(data => setNews(data))
    },[])
    return ( 
        <div>
            <div className="grid grid-cols-1 gap-2">
                {
                    news.map(feed => <Feed key={feed.id} feed={feed}></Feed>)
                }
            </div>
        </div>
     );
}
 
export default Feeds;