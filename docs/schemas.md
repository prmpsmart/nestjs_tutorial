### Expanded Schema | Entities

#### **1. Users**

- **user_id** (Primary Key)
- username
- email
- password_hash
- profile_picture
- bio
- location (current location of the user)
- date_joined
- steps_count (total number of steps taken)
- active_status (online/offline)
- rank_id (Foreign Key - reference to the `Ranks` table)
- follow_count
- follower_count
- social_links (links to other social media accounts)

#### **2. Events**

- **event_id** (Primary Key)
- name
- description
- event_type (challenge, solo trekking, co-trekking, etc.)
- start_date
- end_date
- location (geolocation, such as latitude, longitude, or an address)
- participants (array of user IDs or a join table between Users and Events for many-to-many relation)
- organizer_user_id (Foreign Key - reference to the `Users` table)
- status (active, completed, cancelled)
- created_at
- updated_at
- challenge_type (optional; if the event is a challenge, specify the challenge type)

#### **3. Steps**

- **step_id** (Primary Key)
- user_id (Foreign Key - reference to the `Users` table)
- timestamp
- step_count (number of steps taken in a session)
- location (geolocation, such as latitude and longitude)
- distance (optional, calculated based on steps)
- route_id (Foreign Key - reference to the `Routes` table for a specific user’s path)

#### **4. Routes** (This entity tracks user routes)

- **route_id** (Primary Key)
- user_id (Foreign Key - reference to the `Users` table)
- start_location (latitude, longitude)
- end_location (latitude, longitude)
- route_path (list of geolocation points marking the route)
- total_distance
- duration (time taken for the route)
- timestamp
- is_completed (Boolean)

#### **5. Ranks**

- **rank_id** (Primary Key)
- user_id (Foreign Key - reference to the `Users` table)
- rank_type (e.g., “Beginner”, “Intermediate”, “Expert”)
- rank_score (numeric value based on the user’s total steps, challenges completed, etc.)
- date_achieved
- level (optional: user’s progress level in rank)

#### **6. Follows** (Users following other users)

- **follow_id** (Primary Key)
- follower_user_id (Foreign Key - reference to the `Users` table)
- followed_user_id (Foreign Key - reference to the `Users` table)
- followed_at (timestamp of when the user followed another)

#### **7. Chats** (Messaging between users)

- **chat_id** (Primary Key)
- sender_user_id (Foreign Key - reference to the `Users` table)
- receiver_user_id (Foreign Key - reference to the `Users` table)
- message_content (text, voice note URL, or image URL)
- message_type (text, image, voice note)
- timestamp
- status (sent, delivered, read)

#### **8. Comments** (Users commenting on other users' activities or events)

- **comment_id** (Primary Key)
- user_id (Foreign Key - reference to the `Users` table)
- target_id (Foreign Key - can be an Event or Geo-drop ID)
- comment_content
- timestamp
- target_type (can be "event", "geo-drop", etc.)

#### **9. Geo-drops**

- **geo_drop_id** (Primary Key)
- user_id (Foreign Key - reference to the `Users` table)
- image_url (optional)
- voice_note_url (optional)
- text_content (optional)
- gift (optional, reference to Wallets)
- latitude (geolocation)
- longitude (geolocation)
- timestamp
- target_location_name (optional, e.g., "Central Park")

#### **10. Wallets** (Tracking user’s virtual balance)

- **wallet_id** (Primary Key)
- user_id (Foreign Key - reference to the `Users` table)
- balance (total amount of virtual currency or points)
- transaction_history (JSON or array with transaction records)
- last_transaction_date
- transaction_type (e.g., points earned, redeemed, gift sent)

#### **11. Gifts** (A special form of Geo-drops; virtual items)

- **gift_id** (Primary Key)
- gift_type (e.g., virtual coin, badge, item)
- sender_user_id (Foreign Key - reference to the `Users` table)
- recipient_user_id (Foreign Key - reference to the `Users` table)
- date_sent
- gift_status (pending, delivered)

---

### Relationships and Business Logic

- **User-Event Relationship:** Users can create and participate in events. The `Events` table stores which users are the event organizers, and the `Participants` table can be used for many-to-many relationships between users and events.
- **User-Rank Relationship:** Users are ranked based on their step count, challenge participation, or achievements. You can calculate the rank dynamically based on user activity.
- **Geo-drops and Wallets:** Users can leave geo-drops (images, voice notes, text, gifts) and interact with other users' geo-drops. Some geo-drops might involve sending gifts, which are tracked in the `Wallets` table for transaction history.
- **Social Connections:** `Follows`, `Chats`, and `Comments` establish the social networking features of your app. Users can follow other users, chat with them, or leave comments on events or geo-drops.

---

### Suggested Additions for Future Features:

1. **Push Notifications** - A schema for managing notifications for users about events, geo-drops, steps milestones, etc.

   - **notification_id** (Primary Key)
   - **user_id** (Foreign Key - reference to the `Users` table)
   - **type** (e.g., event reminder, new geo-drop, new message)
   - **message_content**
   - **status** (unread, read)
   - **timestamp**

2. **Achievements** - Users can earn achievements based on their activity.

   - **achievement_id** (Primary Key)
   - **user_id** (Foreign Key - reference to the `Users` table)
   - **name** (e.g., "100k Steps")
   - **description**
   - **earned_at** (timestamp)

3. **User Preferences** - Schema to manage user settings (notifications, privacy settings, etc.)

   - **user_id** (Foreign Key - reference to the `Users` table)
   - **preference_key**
   - **preference_value**

4. **Challenges & Rewards System** - This system will encourage user participation.
   - **challenge_id** (Primary Key)
   - **challenge_name**
   - **description**
   - **reward_type** (e.g., points, badge, discount)
   - **active_period** (start_date, end_date)
   - **participants** (array of user IDs or many-to-many relationship)

---

By expanding on these entities and relationships, you'll have a flexible and scalable schema to support user interactions, rankings, and geolocation-based features while keeping track of wallets and user activity.

Does this expansion align with your app's vision, or are there any specific areas you'd like to adjust or expand further?
