import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

const authStub: any = {
  authState: {},
  currentUser: {},
  auth: {
    signInWithPopup() {},
    signOut() {},
  },
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFireAuth, useValue: authStub }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
