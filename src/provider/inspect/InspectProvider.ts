interface InspectProvider {

  getInspectForId(id: string): Promise<string>

}

export {InspectProvider}