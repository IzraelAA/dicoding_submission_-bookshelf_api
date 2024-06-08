import Hapi from '@hapi/hapi';
import booksRoutes from './routes/books.js';

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    });

    server.route(booksRoutes);

    await server.start();
    console.log(`Server running on port ${server.info.port}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
