import { Tabs } from "antd";
import PageTitle from "../PageTitle/PageTitle";
import Movies from "../../pages/Dashboard/Movies/Movies";
import Theatres from "../../pages/Dashboard/Theatres/Theatres";


function AdminTab() {
  return (
    <>
      <PageTitle title={"Admin"} />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Movies" key={1}>
          <Movies />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Theatres" key={2}>
          <Theatres />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default AdminTab;
