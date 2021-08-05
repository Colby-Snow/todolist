from marshmallow import Schema, fields, validates, ValidationError, validates_schema
from marshmallow.validate import Length


class UserSchema(Schema):
    username = fields.Str(validate=Length(min=4))
    password = fields.Str(validate=Length(min=8))
    password2 = fields.Str(validate=Length(min=8))

    @validates('password')
    def validate_password(self, newpassword):
        if not any(map(str.isdigit, newpassword)):
            raise ValidationError('must contain at least one digit')

    @validates_schema
    def passwords_match(self, all_data, **kwargs):
        if all_data['password'] != all_data['password2']:
            raise ValidationError('passwords must match')