const z = require('zod');

const movieSchema = z.object({
  title: z.string({ required_error: 'El titulo es requerido' }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({ message: 'El poster debe ser una URL valida' }),
  genre: z.array(
    z.enum([
      'Drama',
      'Action',
      'Crime',
      'Adventure',
      'Sci-Fi',
      'Romance',
      'Animation',
      'Biography',
      'Fantasy',
    ]),
    {
      required_error: 'El genero de la pelicula es requerido',
      invalid_type_error: 'El genero debe ser del tipo array',
    }
  ),
  rate: z.number().min(0).max(10).default(5),
});

function validateMovie(object) {
  return movieSchema.safeParse(object);
}

function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}
// con 'partial()' de zod, las propiedades van a ser opcionales, si la/s propiedad/es esta/n la valida y si no no pasa nada

// safeParse -> devuelve un objeto result que te dice si hay un error o datos

module.exports = { validateMovie, validatePartialMovie };
//! asi se importan en otro archivo
//const { validateMovie, validatePartialMovie } = require('./schemas/movies');
