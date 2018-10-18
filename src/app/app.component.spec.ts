import { AppComponent } from './app.component';
import { TestBed, async } from '@angular/core/testing';
import { UserApi } from './service/user.api';
import { of, Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { User } from './model/user';

describe('AppComponent', () => {
  let userApi: jasmine.SpyObj<UserApi>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: UserApi,
          useValue: jasmine.createSpyObj('userApi', ['getAllUsers']),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    userApi = TestBed.get(UserApi);
    userApi.getAllUsers.and.returnValue(
      of([
        { first: 'rupesh', email: 'roopkt@gmail.com', id: '1', title: 'Mr' },
      ]),
    );
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-app-fake-api-sample'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-app-fake-api-sample');
  });

  it('should get all users', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.users$.subscribe(s => {
      expect(s).toEqual([
        {
          first: 'rupesh',
          email: 'roopkt@gmail.com',
          id: '1',
          title: 'Mr',
        } as User,
      ]);
    });
  });
});
