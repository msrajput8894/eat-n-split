import { Friend } from "./Friend";

export function FriendsList({ friends, onSelection, selectedFriend }) {
  return friends && friends.length > 0 ? (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
          key={friend.id}
        />
      ))}
    </ul>
  ) : (
    <h2>No Friends added yet please add friends to continue..</h2>
  );
}
