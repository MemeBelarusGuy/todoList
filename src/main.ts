import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import * as dotenv from 'dotenv'

dotenv.config()

const start = async () => {
    try {
        const PORT = process.env.PORT || 4000;
        const app = await NestFactory.create(AppModule)
        app.enableCors();
        await app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (err) {
        console.log(err);
    }
}
start();