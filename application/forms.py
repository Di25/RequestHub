from django import forms
from django.contrib.admin.widgets import AdminDateWidget
from django.forms import inlineformset_factory, DateTimeInput, DateInput

from application.models import Application, ApplicationProduct, Objects


class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = ('full_name', 'phone_number', 'address')


class ApplicationProductForm(forms.ModelForm):
    class Meta:
        model = ApplicationProduct
        fields = ('product', 'quantity', 'image')


ApplicationProductFormSet = inlineformset_factory(Application, ApplicationProduct, form=ApplicationProductForm, extra=1)


# class BitrixForm(forms.Form):
#     product_name = forms.CharField(label='Наименование (товар)', max_length=100, required=True)
#     city = forms.CharField(label='Город', max_length=100, required=True)
#     street = forms.CharField(label='Улица', max_length=100, required=True)
#     house = forms.CharField(label='Дом', max_length=100, required=True)


class ObjectsForm(forms.ModelForm):
    date_of_delivery = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date'}),
        label='Дата поставки'
    )
    full_address = forms.CharField(
        widget=forms.Textarea(),
        label='Полный адрес'
    )

    class Meta:
        model = Objects
        fields = ('city', 'street', 'house', 'dealer_name',
                  'manager', 'main_name', 'main_phone', 'full_address',
                  'full_name_object', 'architect', 'investor', 'materials',
                  'stages', 'date_of_delivery', 'document')
