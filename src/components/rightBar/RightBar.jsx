import "./rightBar.scss";
import { Link } from "react-router-dom";

import Free from "../../assets/cart-line-icon.jpg";
import Merch from "../../assets/outdoor-market.jpg";
import Events from "../../assets/food-trucks.jpg";
import Games from "../../assets/ball-american-football-icon.jpg";
import Jobs from "../../assets/briefcase-icon.jpg";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item" style={{paddingTop: 0}}>
          <Link to={"/market"} className="circle-icon" style={{marginTop: 0}}>
            <img src={Free}/>
            <p>Free Items</p>
          </Link>
          <Link to={"/market"} className="circle-icon">
            <img src={Merch}/>
            <p>Aggie Merch</p>
          </Link>
          <Link to={"/events"}  className="circle-icon">
            <img src={Events}/>
            <p>BCS Events</p>
          </Link>
          <Link to={"/tamu"}  className="circle-icon">
            <img src={Games}/>
            <p>Aggie Games</p>
          </Link>
          <Link to={"/jobs"} className="circle-icon">
            <img src={Jobs}/>
            <p>Students & Jobs</p>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RightBar;


// import "./rightBar.scss";

// const RightBar = () => {
//   return (
//     <div className="rightBar">
//       <div className="container">
//         <div className="item">
//           <span>Suggestions For You</span>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <span>Jane Doe</span>
//             </div>
//             <div className="buttons">
//               <button>sigue</button>
//               <button>ignora</button>
//             </div>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <span>Jane Doe</span>
//             </div>
//             <div className="buttons">
//               <button>sigue</button>
//               <button>ignora</button>
//             </div>
//           </div>
//         </div>
//         <div className="item">
//           <span>Latest Activities</span>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <p>
//                 <span>Jane Doe</span> changed their cover picture
//               </p>
//             </div>
//             <span>1 min ago</span>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <p>
//                 <span>Jane Doe</span> changed their cover picture
//               </p>
//             </div>
//             <span>1 min ago</span>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <p>
//                 <span>Jane Doe</span> changed their cover picture
//               </p>
//             </div>
//             <span>1 min ago</span>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <p>
//                 <span>Jane Doe</span> changed their cover picture
//               </p>
//             </div>
//             <span>1 min ago</span>
//           </div>
//         </div>
//         <div className="item">
//           <span>Online Friends</span>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <div className="online" />
//               <span>Jane Doe</span>
//             </div>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <div className="online" />
//               <span>Jane Doe</span>
//             </div>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <div className="online" />
//               <span>Jane Doe</span>
//             </div>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <div className="online" />
//               <span>Jane Doe</span>
//             </div>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <div className="online" />
//               <span>Jane Doe</span>
//             </div>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <div className="online" />
//               <span>Jane Doe</span>
//             </div>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <div className="online" />
//               <span>Jane Doe</span>
//             </div>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <div className="online" />
//               <span>Jane Doe</span>
//             </div>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <div className="online" />
//               <span>Jane Doe</span>
//             </div>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <div className="online" />
//               <span>Jane Doe</span>
//             </div>
//           </div>
//           <div className="user">
//             <div className="userInfo">
//               <img
//                 src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <div className="online" />
//               <span>Jane Doe</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RightBar;
