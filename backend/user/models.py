from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

from .validators import username_validator, clean_username


class Role(models.TextChoices):
    USER = "user", "User"
    ADMIN = "admin", "Admin"
    OWNER = "owner", "Owner"
    CUSTOMER = "customer", "Customer"


class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        """
        Creates and saves a User with the given email, username and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        username = clean_username(username)

        user = self.model(
            email=email,
            username=username,
            **extra_fields,
        )

        user.set_password(password)
        user.is_active = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        """
        Creates and saves a superuser with the given email, username and password.
        """
        user = self.create_user(
            email,
            password=password,
            username=clean_username(username),
        )
        user.is_admin = True
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
        db_index=True,
    )
    username = models.CharField(
        max_length=255, unique=True, db_index=True, validators=[username_validator]
    )
    display_name = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return self.is_staff

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return self.is_admin

    def get_owner(self):
        from owner.models import Owner

        try:
            return Owner.objects.get(user=self)
        except Exception as e:
            print("ERROR:", e)
        return None

    def get_customer(self):
        from customer.models import Customer

        try:
            return Customer.objects.get(user=self)
        except Exception as e:
            print("ERROR:", e)
        return None

    @property
    def role(self):
        if self.is_staff or self.is_admin:
            return Role.ADMIN
        elif self.get_owner():
            return Role.OWNER
        elif self.get_customer():
            return Role.CUSTOMER
        else:
            return Role.USER


class BaseProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=32, blank=True)
    organization = models.CharField(max_length=64, blank=True)

    def __str__(self):
        return self.user.username

    class Meta:
        abstract = True
