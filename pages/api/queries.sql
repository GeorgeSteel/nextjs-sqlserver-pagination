
- List of users logged into Regs2Go in the past 90 days, sorted by date
- Which pages were visited in the past 90 days? number of times it was visited (sort by most visited)



--List of people logged inthe past 90 days, ordered by last login
select distinct u.UserName, u.LastLogin, Count(uh.Id) as "Logins in past 90 days"
from dbo.Users as u
join UserHistory uh on uh.UserId = u.Id
where  LastLogin >= (GetDate() - 90) and TrackingTime >= (GetDate() - 90)
group by u.UserName, u.LastLogin
order by LastLogin desc

-- List of people logged inthe past 90 days, ordered by number of logins
select distinct u.UserName, u.LastLogin, Count(uh.Id) as "Logins in past 90 days"
from dbo.Users as u
join UserHistory uh on uh.UserId = u.Id
where  LastLogin >= (GetDate() - 90) and TrackingTime >= (GetDate() - 90)
group by u.UserName, u.LastLogin
order by Count(uh.Id) desc


-- List of pages that users viewed, ordered by number of users
select distinct Content, Count(UserId)  as UserCount from dbo.UserHistory
where  TrackingTime >= (GetDate() - 90)
group by Content
order by  Count(UserId) desc

-- Can we add one that lists all the books (not pages) that users accessed? This would require parsing the url for the book name (withot the page)
-- One more need to add: a list of all the users/pages that were accessed yesterday

