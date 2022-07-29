import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

/**
 * Service used to handle static data configuration, such as base API URLs, endpoint
 * configuration, etc.
 *
 * @export
 * @class StaticDataService
 */
@Injectable()
export class StaticDataService {
  readonly route: string = 'assets';

  /**
   * Creates an instance of StaticDataService.
   * @param {HttpClient} http Angular's HTTP Client service
   * @memberof StaticDataService
   */
  constructor(private http: HttpClient) {}

  /**
   * Gets the component configuration from the 'assets' folder, for a given component name
   *
   * @template T
   * @param {string} componentName The component for which to retrieve configuration
   * @return {*}  {Observable<T>} An observable with the options for the required component
   * @memberof StaticDataService
   */
  public getStaticData<T>(componentName: string): Observable<T> {
    return this.http.get<T>(`${this.route}/data/${componentName}.json`).pipe(take(1));
  }
}
