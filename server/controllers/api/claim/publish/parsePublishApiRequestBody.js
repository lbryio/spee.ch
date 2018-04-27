const parsePublishApiRequestBody = ({name, nsfw, license, title, description, thumbnail}) => {
  // validate name
  if (!name) {
    throw new Error('no name field found in request');
  }
  const invalidNameCharacters = /[^A-Za-z0-9,-]/.exec(name);
  if (invalidNameCharacters) {
    throw new Error('The claim name you provided is not allowed.  Only the following characters are allowed: A-Z, a-z, 0-9, and "-"');
  }
  // optional parameters
  nsfw = (nsfw === 'true');
  license = license || null;
  title = title || null;
  description = description || null;
  thumbnail = thumbnail || null;
  // return results
  return {
    name,
    nsfw,
    license,
    title,
    description,
    thumbnail,
  };
};

module.exports = parsePublishApiRequestBody;
