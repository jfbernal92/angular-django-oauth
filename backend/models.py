from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from localflavor.generic.models import IBANField


class SystemUser(AbstractUser):
    """
    set email as unique username and allow empty passwords (oauth users)
    """
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(_('username'), max_length=150, blank=True)
    password = models.CharField(_('password'), max_length=128, blank=True, null=True)

    class Meta:
        verbose_name = 'Admin User'
        verbose_name_plural = 'Admin Users'


class User(models.Model):
    creator = models.ForeignKey(to=SystemUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    iban = IBANField()

    def __str__(self):
        return '{} {} ({})'.format(self.first_name, self.last_name, self.iban)

    class Meta:
        verbose_name = 'Bank account user'
        verbose_name_plural = 'Bank account users'
