import http from "./config"

const clients = {
	get: (params)=> http.get("/client/all", {params}),
	delete: ({id, owner_id})=> http.delete("/client", {params: {id, owner_id}}),
}

export default clients