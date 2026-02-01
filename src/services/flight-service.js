const { FlightRepository } = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const { compareTime } = require('../utils/helpers/datetime-helpers')

const AppError = require('../utils/errors/app-error')

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    if(!compareTime(data.arrivalTime ,data.departureTime)){
     throw new AppError('Arrival time must be greater than departure time', StatusCodes.BAD_REQUEST);
    }
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    if(error.name === 'SequelizeValidationError'){
      let explanation = [];
      error.errors.forEach(err => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Cannot create new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createFlight,
}