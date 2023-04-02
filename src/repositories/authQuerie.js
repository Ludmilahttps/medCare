export const getEmailByEmail = () => {
    const query = `--sql
      SELECT
          email
      FROM
          users
      WHERE
          email = $1;             
  `
    return query
  }

  export const insertInUsers = () => {
    const query = `--sql
          INSERT INTO
              users ("type", "typeId", "email", "password")
          VALUES
              ($1, $2, $3, $4);        
      `
    return query
  }

  export const insertDoctors = () => {
    const query = `--sql
          INSERT INTO
              doctors ("name", "specialty", "locality")
          VALUES
              ($1, $2, $3);        
      `
    return query
  }

  export const getDoctorId = () => {
    const query = `--sql
      SELECT
          "id"
      FROM
          doctors
      WHERE
          name = $1;
  `
    return query
  }

  export const getPasswordByEmail = () => {
    const query = `--sql
      SELECT
          "password"
      FROM
          users
      WHERE
          email = $1;
  `
    return query
  }
  
  export const getUserByEmail = () => {
    const query = `--sql
      SELECT
          *
      FROM
          users
      WHERE
          email = $1;             
  `
    return query
  }