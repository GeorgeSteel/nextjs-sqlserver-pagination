// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const sql = require('mssql')

export default async (req, res) => {
  const query = `select distinct Content, Count(UserId)  as UserCount from dbo.UserHistory
  where  TrackingTime >= (GetDate() - 90)
  group by Content
  order by  Count(UserId) desc
  OFFSET ${req.query.offset} ROWS FETCH NEXT ${req.query.fetch} ROWS ONLY`

  const rows_count = `select top 1 COUNT(*) OVER () as rows from dbo.UserHistory
  where  TrackingTime >= (GetDate() - 90)
  group by Content
  order by  Count(UserId) desc`
  try {
    await sql.connect('mssql://sa:123456@localhost/daye')

    const result = await sql.query(query)
    const rows = await sql.query(rows_count)

    res.status(200).json({ ...result, ...rows.recordset[0] })
  } catch (error) {
    res.status(200).json(error)
  }
}
