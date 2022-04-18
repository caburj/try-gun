import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { v4 } from 'uuid';

export default observer((props: { partitions: any }) => {
  const [name, setName] = useState('');
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await props.partitions.set(v4(), { name });
        setName('');
      }}
    >
      <input
        type="text"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Create Partition</button>
    </form>
  );
});
