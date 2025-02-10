import {
  ProColumns,ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;
export type Props = {
  columns: ProColumns<API.InterfaceInfo>;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};
const CreateModel: React.FC<Props> = (props) => {
  return (
    <Modal footer={null} visible={props.visible} onCancel={() => {props.onCancel?.()}}>
      <ProTable type={'form'} columns={props.columns} onSubmit={async (values) => {
        props.onSubmit?.(values);
      }}/>
    </Modal>
  );
};
export default CreateModel;
