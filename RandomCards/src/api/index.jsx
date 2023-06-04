export const getAllProfiles = async () => {
  const data = await fetch("/data/profiles.json");
  const { results } = await data.json();
  return results;
};
