import { observer } from 'mobx-react-lite';
import { IMySyncedMap } from '../models/synced';
import Partition from './Partition';

export default observer((props: { partitions: IMySyncedMap }) => {
  return (
    <ul>
      {props.partitions.getItems().map(([id, partition]) => {
        return (
          <li>
            <button onClick={() => props.partitions.delete(id)}>x</button>
            <Partition key={id} partition={partition} />
          </li>
        );
      })}
    </ul>
  );
});
