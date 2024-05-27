/**
 * Structure of a Tag
 * {
 *  "id": <number>,
 *  "tagName": <String>,
 *  "tagColorId": <number>
 * }
 */

export const findTagById = (userTags, tagId) => {
  return userTags.find((uT) => uT.id === tagId);
};
// export const findTagColorCode = (palette, )

export const findTagColorCode = (tagsPalette, tagColorId) => {
  return tagsPalette.find((tP) => tP.id === tagColorId)?.code;
};
