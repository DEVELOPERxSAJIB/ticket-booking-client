import { Tabs } from "antd";
import PageTitle from "../PageTitle/PageTitle";
import { useSelector } from "react-redux";
import Booking from "../../pages/Profile/Booking/Booking";
import AddTheatres from "../../pages/Profile/AddTheatres/AddTheatres";


function ProfileTab() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <PageTitle title={`your profile ${user.name}`} />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Booking" key={1}>
          <Booking />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Add Theatres" key={2}>
          <AddTheatres />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default ProfileTab;
