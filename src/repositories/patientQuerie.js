export const getDoctorbyWord = () => {
  const query = `--sql
      SELECT
          *
      FROM
          doctors
      WHERE
          name = $1
      OR
          specialty = $1
      OR
          locality = $1;             
  `
  return query
}
