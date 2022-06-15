export const handledUnauthorized = (error: any) => {
    if (error.status === 401) {
        localStorage.removeItem("token");
        return false
    }
     return true
}