import httpService from "./http.service";
const qualitieEndpoint = "quality/";

const qualitieService = {
    fetchAll: async () => {
        const { data } = await httpService.get(qualitieEndpoint);
        return data;
    }
};
export default qualitieService;
