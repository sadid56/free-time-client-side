
import SectionHelmet from "../../../shared/SectionHelmet/SectionHelmet";
import Feeds from "../Feeds/Feeds";
import Sideber from "../Sideber/Sideber";

const Home = () => {
    return (  
        <div>
            <SectionHelmet title={'Free Time | Feeds'}/>
             <div className="flex">
                <div className="w-[30%] bg-[#f0f2f5] border-r-2 min-h-screen fixed overflow-y-scroll">
                    {/* sideber */}
                    <Sideber/>
                    </div>
                <div className="w-[40%] ml-[30%]">
                    
                    {/* main content */}
                    <Feeds/>
                    
                    </div>
             </div>
        </div>
     );
}
 
export default Home;