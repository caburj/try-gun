import { observer } from 'mobx-react-lite';
import { getSyncedMap } from '../models/synced';
import { user } from '../user';
import PartitionCreate from './PartitionCreate';
import PartitionList from './PartitionList';

export default observer((props: { accountId: string }) => {
  const partitions = getSyncedMap(`${props.accountId}.partitions`, user);
  return (
    <div>
      <PartitionCreate partitions={partitions} />
      <PartitionList partitions={partitions} />
    </div>
  );
});
