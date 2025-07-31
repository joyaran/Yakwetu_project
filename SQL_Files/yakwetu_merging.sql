-- Step 1: Create a table merging views and content
CREATE TABLE views_with_content AS
SELECT
    v.view_id,
    v.user_id,
    v.content_id,
    v.platform,
    v.createdon AS view_created_on,
    v.currenttime,
    v.ipaddress,
    v.lasteditedon,
    c.title,
    c.genres,
    c.duration,
    c.countries AS content_country,
    c.year
FROM
    views AS v
JOIN
    content AS c ON v.content_id = c.content_id;

-- Optional: Verify the new table (run this after the CREATE TABLE statement completes)
-- SELECT * FROM views_with_content LIMIT 10;

-- Step 2: Create a table merging purchases and content
CREATE TABLE purchases_with_content AS
SELECT
    p.purchase_id,
    p.user_id,
    p.content_id,
    p.purchase_type,
    p.amount,
    p.createdon AS purchase_created_on,
    p.source,
    p.currency,
    c.title,
    c.genres,
    c.duration,
    c.countries AS content_country,
    c.year
FROM
    purchases AS p
JOIN
    content AS c ON p.content_id = c.content_id;

-- Optional: Verify the new table (run this after the CREATE TABLE statement completes)
-- SELECT * FROM purchases_with_content LIMIT 10;

-- Step 3: Create a table merging views_with_content with users
CREATE TABLE views_full_data AS
SELECT
    vwc.*, -- Select all columns from views_with_content
    u.locale
FROM
    views_with_content AS vwc
JOIN
    users AS u ON vwc.user_id = u.user_id;

-- Optional: Verify the new table (run this after the CREATE TABLE statement completes)
-- SELECT * FROM views_full_data LIMIT 10;

-- Step 4: Create a table merging purchases_with_content with users
CREATE TABLE purchases_full_data AS
SELECT
    pwc.*, -- Select all columns from purchases_with_content
    u.locale
FROM
    purchases_with_content AS pwc
JOIN
    users AS u ON pwc.user_id = u.user_id;

-- Optional: Verify the new table (run this after the CREATE TABLE statement completes)
-- SELECT * FROM purchases_full_data LIMIT 10;

-- Step 5 (Optional but Recommended): Create a unified activity table
CREATE TABLE combined_user_activity AS
SELECT
    'view' AS record_type,
    view_id AS activity_id,
    user_id,
    content_id,
    platform,
    view_created_on AS activity_created_on,
    currenttime,
    ipaddress,
    lasteditedon,
    title,
    genres,
    duration,
    content_country,
    year,
    locale,
    NULL AS purchase_type,
    NULL AS amount,
    NULL AS source,
    NULL AS currency
FROM
    views_full_data

UNION ALL

SELECT
    'purchase' AS record_type,
    purchase_id AS activity_id,
    user_id,
    content_id,
    NULL AS platform, -- No platform for purchases in this schema
    purchase_created_on AS activity_created_on,
    NULL AS currenttime,
    NULL AS ipaddress,
    NULL AS lasteditedon,
    title,
    genres,
    duration,
    content_country,
    year,
    locale,
    purchase_type,
    amount,
    source,
    currency
FROM
    purchases_full_data;

-- Optional: Verify the final combined table
-- SELECT * FROM combined_user_activity LIMIT 20;
-- SELECT record_type, COUNT(*) FROM combined_user_activity GROUP BY record_type;