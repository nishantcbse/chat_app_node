/*** migrations ***/
CREATE TABLE users (
 id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(68) NOT NULL,
  password varchar(256) NOT NULL,
  name varchar(200) NOT NULL,
  created_date varchar(68) NOT NULL
);
CREATE TABLE messages (
  id int(11) NOT NULL AUTO_INCREMENT,
  message varchar(256) NOT NULL,
  user_id int(11) NOT NULL,
  unix_timestamp BIGINT(68) NOT NULL;
  created_date varchar(68) NOT NULL
);





