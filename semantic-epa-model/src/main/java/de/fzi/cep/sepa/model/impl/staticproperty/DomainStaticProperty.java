package de.fzi.cep.sepa.model.impl.staticproperty;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.clarkparsia.empire.annotation.Namespaces;
import com.clarkparsia.empire.annotation.RdfProperty;
import com.clarkparsia.empire.annotation.RdfsClass;

import de.fzi.cep.sepa.model.util.Cloner;

@Namespaces({"sepa", "http://sepa.event-processing.org/sepa#",
	 "dc",   "http://purl.org/dc/terms/"})
@RdfsClass("sepa:DomainStaticProperty")
@Entity
public class DomainStaticProperty extends StaticProperty {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@RdfProperty("sepa:requiredClass")
	private String requiredClass;
	

	@OneToMany(fetch = FetchType.EAGER,
			   cascade = {CascadeType.ALL})
	@RdfProperty("sepa:supportedProperty")
	private List<SupportedProperty> supportedProperties;
	
	public DomainStaticProperty()
	{
		super();
	}
	
	public DomainStaticProperty(String internalName, String label, String description, List<SupportedProperty> supportedProperties)
	{
		super(internalName, label, description);
		this.supportedProperties = supportedProperties;
	}
	
	public DomainStaticProperty(String internalName, String label, String description, String requiredClass, List<SupportedProperty> supportedProperties)
	{
		this(internalName, label, description, supportedProperties);
		this.requiredClass = requiredClass;
	}
	
	public DomainStaticProperty(DomainStaticProperty other)
	{
		super(other);
		this.requiredClass = other.getRequiredClass();
		this.supportedProperties = new Cloner().supportedProperties(other.getSupportedProperties());
	}

	public String getRequiredClass() {
		return requiredClass;
	}

	public void setRequiredClass(String requiredClass) {
		this.requiredClass = requiredClass;
	}

	public List<SupportedProperty> getSupportedProperties() {
		return supportedProperties;
	}

	public void setSupportedProperties(List<SupportedProperty> supportedProperties) {
		this.supportedProperties = supportedProperties;
	}
	
	public void accept(StaticPropertyVisitor visitor) {
		visitor.visit(this);
	}
}
