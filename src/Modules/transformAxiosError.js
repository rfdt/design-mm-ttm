export const transformAxiosError = (error) => {
    try {
        return (error && error.response && error?.response?.data?.message) || error?.request.message || error?.message || "Произошла ошибка подключения"
    }catch (e){
        return "Произошла ошибка подключения"
    }
}
