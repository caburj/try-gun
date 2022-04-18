import Buffer from 'buffer';
import GUN from 'gun/gun';
import 'gun/sea';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';
import 'gun/lib/webrtc';
import 'gun/lib/path';
import 'gun/nts';

// Issue in gun: https://github.com/amark/gun/issues/1209
(window as any).setImmediate = setTimeout;
(window as any).Buffer = Buffer.Buffer;

export const gun = GUN({ localStorage: false });
