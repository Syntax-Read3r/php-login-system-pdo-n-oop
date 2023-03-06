<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email'.$this->id,//NOTE: When ever updating an already exiting user, with the current rule (email => unique) is the id that need to be excluded inside the check.(By saying $this, the md is referring to the request, and inside th request, there will be an ->id*) Here, Laravel is being told that the email is to be unique inside the users mail table. This is to be only applied to every other user inside the table except the user with the *id* classifed
            'password' => [
                'confirmed',
                Password::min(9)->letters()->symbols()
            ]
        ];
    }
}
