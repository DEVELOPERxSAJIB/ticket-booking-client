import { Col, Form, Input } from "antd";
import ModalPopUp from "../../../../utils/ModalPopUp";

export const Shows = ({
  title = "Add Shows",
  width = "1000px",
  open = false,
}) => {
  <ModalPopUp title={title} width={width} open={open}>
    <Form>
      <Col span={14}>
        <Form.Item label="Name" name={"name"}>
          <Input type="text" />
        </Form.Item>
      </Col>
    </Form>
  </ModalPopUp>;
};
