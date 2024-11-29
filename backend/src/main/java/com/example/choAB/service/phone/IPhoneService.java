package com.example.choAB.service.phone;

import com.example.choAB.model.Phone;
import java.util.List;

public interface IPhoneService {
    Phone savePhone(Phone phone);          
    List<Phone> getAllPhones();           
    Phone getPhoneById(Long id);          
    void deletePhone(Long id);            
}
