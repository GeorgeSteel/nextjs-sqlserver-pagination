// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const sql = require('mssql')

export default async (req, res) => {
  if (
    req.query.query === 'List of people logged inthe past 90 days, ordered by last login'
  ) {
    const query = `select distinct u.UserName, u.LastLogin, Count(uh.Id) as "LoginsInPast90Days"
    from dbo.Users as u
    join UserHistory uh on uh.UserId = u.Id
    where  LastLogin >= (GetDate() - 90) and TrackingTime >= (GetDate() - 90)
    group by u.UserName, u.LastLogin
    order by LastLogin desc
    OFFSET ${req.query.offset} ROWS FETCH NEXT ${req.query.fetch} ROWS ONLY`

    const rows_count = `select top 1 COUNT(*) OVER () as rows
    from dbo.Users as u
    join UserHistory uh on uh.UserId = u.Id
    where  LastLogin >= (GetDate() - 90) and TrackingTime >= (GetDate() - 90)
    group by u.UserName, u.LastLogin
    order by LastLogin desc`

    try {
      await sql.connect('mssql://sa:123456@localhost/daye')

      const result = await sql.query(query)
      const rows = await sql.query(rows_count)

      res.status(200).json({ ...result, ...rows.recordset[0] })
    } catch (error) {
      res.status(200).json(error)
    }
  } else {
    const query = `select distinct u.UserName, u.LastLogin, Count(uh.Id) as "LoginsInPast90Days"
    from dbo.Users as u
    join UserHistory uh on uh.UserId = u.Id
    where  LastLogin >= (GetDate() - 90) and TrackingTime >= (GetDate() - 90)
    group by u.UserName, u.LastLogin
    order by Count(uh.Id) desc
    OFFSET ${req.query.offset} ROWS FETCH NEXT ${req.query.fetch} ROWS ONLY`

    const rows_count = `select top 1 COUNT(*) OVER () as rows
    from dbo.Users as u
    join UserHistory uh on uh.UserId = u.Id
    where  LastLogin >= (GetDate() - 90) and TrackingTime >= (GetDate() - 90)
    group by u.UserName, u.LastLogin
    order by Count(uh.Id) desc`

    try {
      await sql.connect('mssql://sa:123456@localhost/daye')

      const result = await sql.query(query)
      const rows = await sql.query(rows_count)

      res.status(200).json({ ...result, ...rows.recordset[0] })
    } catch (error) {
      res.status(200).json(error)
    }
  }
}
