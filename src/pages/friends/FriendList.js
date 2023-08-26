import React, { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore'
import { useDocument } from '../../hooks/useDocument'
import { useCollection } from '../../hooks/useCollection'

// styles
import styles from './Home.module.css'

export default function FriendList({ friends }) {
  const [sortedFriends, setSortedFriends] = useState([]);
  const { documents, error } = useCollection('userEnergyAndPoints')
  console.log(documents)

  useEffect(() => {
    const fetchAndSortFriends = async () => {
      let friendsWithPoints = [];
      

      for (const friend of friends) {
        const doc = documents.find((document) => document.id === friend.uid);
        if (doc) {
          friendsWithPoints.push({ ...friend, points: doc.points });
        }
      }

      // Sort the friends by points
      friendsWithPoints.sort((a, b) => b.points - a.points);

      setSortedFriends(friendsWithPoints);
    };

    fetchAndSortFriends();
  }, [friends, documents]);

  return (
    <>
      <h3>Friend List Lederboard</h3>
      <ul className={styles.transactions}>
        {sortedFriends.map((friend, index) => (
          <li key={friend.uid}>
            <p className={styles.name}>
              {index + 1}. {friend.name}
              <br></br>
              Points: {friend.points}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}