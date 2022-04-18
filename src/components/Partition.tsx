import { observer } from 'mobx-react-lite';

export default observer((props: { partition: any }) => {
  return <span>{props.partition.name}</span>;
});
