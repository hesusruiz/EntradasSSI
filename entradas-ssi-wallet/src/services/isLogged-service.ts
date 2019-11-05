import {Injectable} from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class IsLoggedService {

    subject = new BehaviorSubject(false);
}
