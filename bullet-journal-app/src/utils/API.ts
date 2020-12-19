import axios, { AxiosInstance } from "axios";

export interface Log {
    duration: number;
    details: string;
    _id: string;
    type: "daily" | "monthly" | "future";
    mark: Boolean;
    itemType: string;
    day: number;
    month: number;
    year: number;
  }
class Api {
    private _axios: AxiosInstance;
    constructor(baseUrl: string = "http://localhost:9010/") {
        this._axios = axios.create({
            baseURL: baseUrl,
            responseType: "json"
        });
    }

    getLog(type : string,currentDate: string) {
        return this._axios.get<[]>("logs/" + type + "?currentDate=" + currentDate)
    }

    addLog(log: Log) {
        return this._axios.post<void>('logs/', log)
    }

    updateLog(log: Log) {
        return this._axios.put<void>('logs/', log)
    }
    
    updateLogwithMark(log: Log) {
        return this._axios.put<void>('logs/', {
            mark: !log.mark,
            id: log._id,
          })
    }

    deleteLog(logId: string) {
        return this._axios.delete<void>('logs/', { data: { id: logId } })
    }
}
export default new Api()