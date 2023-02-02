export const notFoundError = (error, request, response, next) => {
  if (error.status === 404) {
    response.status(404).send({ message: error.message })
  } else {
    next(error)
  }
}

export const genericErrors = (error, request, response, next) => {
  console.log(error)
  response.status(500).send({ message: 'There was an error' })
}
