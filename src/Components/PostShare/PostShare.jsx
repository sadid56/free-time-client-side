/* eslint-disable react/prop-types */
import { IoIosShareAlt, IoMdDownload } from "react-icons/io";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const PostShare = ({ url }) => {
  return (
    <div>
<button className="text-xl text-gray-500 mt-1" onClick={()=>document.getElementById('reel_shate').showModal()}><IoIosShareAlt/></button>
<dialog id="reel_shate" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    
    <div className="py-5">
              <div className="divider mb-10">
                Share or Download this media file
              </div>
              <div className="flex items-center justify-center gap-5">
              
                    <FacebookShareButton url={url}>
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    <WhatsappShareButton url={url}>
                      <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                    <TelegramShareButton url={url}>
                      <TelegramIcon size={32} round={true} />
                    </TelegramShareButton>
                    <TwitterShareButton url={url}>
                      <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                    <a download={url} href={url} target="_blank" className="text-xl btn btn-circle" rel="noreferrer">
                      <IoMdDownload />
                    </a>
                 
              </div>
            </div>
  </div>
</dialog>

    </div>
  );
};

export default PostShare;
