UPDATE content
SET genres = NULL
WHERE
    genres IS NOT NULL AND (
        TRIM(genres) = 'NULL' OR -- Catches uppercase string 'NULL'
        TRIM(genres) = 'null' OR -- Catches lowercase string 'null'
        TRIM(genres) = '[]' OR
        LOWER(TRIM(genres)) LIKE '%test%' -- Case-insensitive check for 'test' substring
    );

DELETE FROM content
WHERE
    genres IS NULL OR
    LOWER(TRIM(genres)) LIKE '%test%';
    
DELETE FROM purchases
WHERE content_id NOT IN (SELECT content_id FROM content);    


DELETE FROM views
WHERE content_id NOT IN (SELECT content_id FROM content);    

DELETE FROM users
WHERE
    locale IS NULL OR
    TRIM(locale) = '';


DELETE FROM purchases
WHERE user_id NOT IN (SELECT user_id FROM users);